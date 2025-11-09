#!/usr/bin/env python3
"""
Convertit les fichiers VOC (Creative Voice File) en WAV
Format VOC: ancien format audio de Creative Labs Sound Blaster
"""

import struct
import wave
import sys
import os

def voc_to_wav(voc_path, wav_path):
    """Convertit un fichier VOC en WAV"""

    with open(voc_path, 'rb') as f:
        # Lire le header VOC
        header = f.read(26)

        # Vérifier la signature "Creative Voice File"
        if not header.startswith(b'Creative Voice File\x1a'):
            raise ValueError(f"Pas un fichier VOC valide: {voc_path}")

        # Lire l'offset des données (bytes 20-21)
        data_offset = struct.unpack('<H', header[20:22])[0]

        # Se positionner au début des données
        f.seek(data_offset)

        # Lire les blocks de données
        audio_data = bytearray()
        sample_rate = 8000  # Par défaut

        while True:
            block_type = f.read(1)
            if not block_type or block_type[0] == 0:  # Terminator block
                break

            block_type = block_type[0]

            # Lire la taille du block (3 bytes little-endian)
            size_bytes = f.read(3)
            if len(size_bytes) < 3:
                break
            block_size = struct.unpack('<I', size_bytes + b'\x00')[0]

            if block_type == 1:  # Sound data block
                # Lire les paramètres
                params = f.read(2)
                if len(params) < 2:
                    break

                freq_divisor = params[0]
                codec = params[1]

                # Calculer le sample rate
                if freq_divisor > 0:
                    sample_rate = int(1000000 / (256 - freq_divisor))

                # Lire les données audio (block_size - 2 car on a déjà lu 2 bytes de params)
                data = f.read(block_size - 2)
                audio_data.extend(data)

            elif block_type == 9:  # New sound data block (VOC version 1.20+)
                # Lire les paramètres étendus
                params = f.read(12)
                if len(params) < 12:
                    break

                sample_rate = struct.unpack('<I', params[0:4])[0]
                bits_per_sample = params[4]
                channels = params[5]
                codec = struct.unpack('<H', params[6:8])[0]

                # Lire les données audio
                data = f.read(block_size - 12)
                audio_data.extend(data)
            else:
                # Block inconnu, skip
                f.read(block_size)

    # Créer le fichier WAV
    with wave.open(wav_path, 'wb') as wav:
        wav.setnchannels(1)  # Mono
        wav.setsampwidth(1)  # 8-bit (unsigned 0-255)
        wav.setframerate(sample_rate)

        # Les données VOC sont déjà en unsigned 8-bit (0-255)
        # Le format WAV 8-bit utilise aussi unsigned, donc pas de conversion nécessaire
        wav.writeframes(bytes(audio_data))

    return sample_rate, len(audio_data)

if __name__ == '__main__':
    # Convertir tous les fichiers VOC dans Par/
    par_dir = os.path.join(os.path.dirname(__file__), 'Par')
    sounds_dir = os.path.join(os.path.dirname(__file__), 'sounds')

    # Créer le dossier sounds/ s'il n'existe pas
    os.makedirs(sounds_dir, exist_ok=True)

    voc_files = [f for f in os.listdir(par_dir) if f.endswith('.voc')]

    print(f"🎵 Conversion de {len(voc_files)} fichiers VOC...\n")

    for voc_file in sorted(voc_files):
        voc_path = os.path.join(par_dir, voc_file)
        wav_file = voc_file.replace('.voc', '.wav')
        wav_path = os.path.join(sounds_dir, wav_file)

        try:
            sample_rate, num_samples = voc_to_wav(voc_path, wav_path)
            duration = num_samples / sample_rate
            print(f"✓ {voc_file:12s} → {wav_file:12s} ({sample_rate}Hz, {duration:.2f}s)")
        except Exception as e:
            print(f"✗ {voc_file:12s} - Erreur: {e}")

    print(f"\n✓ Conversion terminée ! Fichiers WAV dans sounds/")
