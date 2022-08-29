# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#   Created by: Asher Andargachew                                             #
#                                                                             #
#   Created on: Jan 11, 2022                                                  #
#                                                                             #
#   Description: This is a python script to automatically go through          #
#                the track directory, get the metadata and list               #
#                it inside of a json to then use for the site                 #
#                RUN THIS PROGRAM TO ADD NEW SONGS EASILY                     #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

import json
from tinytag import TinyTag
import os


def main():
    print("Metadata extraction started...")

    # get path to music
    cwd = os.getcwd()
    direc_name = os.path.dirname(cwd)
    music_path = os.path.join(direc_name, r"assets\music\audio")

    # contain track info in a dictionary
    tracks = {"tracks": []}

    # go to file directory
    for root, dir, files in os.walk(music_path):
        # go through each file in the folder
        for index, name in enumerate(files):
            # get info if it is a music file
            if name.endswith(("m4a", "mp3")):
                song = TinyTag.get(root + "\\" + name)
                tracks["tracks"].append(
                    {
                        "artist": song.artist,
                        "title": song.title,
                        "album": song.album,
                        "file name": name,
                    }
                )

    # write to json file
    with open("soundtracks.json", "w") as f:
        json.dump(tracks, f, indent=4)

    return "Done"


if __name__ == "__main__":
    print(main())
