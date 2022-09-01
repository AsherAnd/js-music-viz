# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#   Created by: Asher Andargachew                                             #
#                                                                             #
#   Created on: Sept 1, 2022                                                  #
#                                                                             #
#   Description: This is a python script to automatically go through          #
#                the track and cover directory, get the metadata and add      #
#                them inside a json to then use for the site                  #
#                RUN THIS PROGRAM TO ADD NEW SONGS EASILY                     #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

import json
import os
import re
from tinytag import TinyTag


def main():
    print("Metadata extraction started...")

    cwd = os.getcwd()
    direc_name = os.path.dirname(cwd)
    music_path = os.path.join(direc_name, "assets", "music", "audio")
    cover_path = os.path.join(direc_name, "assets", "music", "image")

    tracks = {"tracks": []}

    # move to music path
    os.chdir(music_path)

    for file in os.listdir(music_path):
        if os.path.isfile(file) and file.endswith(("m4a", "mp3")):
            # get song meta data
            song = TinyTag.get(file)

            # move to cover path
            os.chdir(cover_path)
            cover = (
                "Unknown.png"
                if song.album is None
                else re.sub("[^a-zA-Z0-9. ]+", "", song.album) + ".jpg"
            )

            # check if song cover exists
            if not os.path.exists(cover):
                cover = "Unknown.png"

            # add song to track list
            tracks["tracks"].append(
                {
                    "artist": song.artist,
                    "title": song.title,
                    "album": song.album,
                    "file name": file,
                    "cover": cover,
                }
            )
        os.chdir(music_path)

    # move back to original directory
    os.chdir(cwd)

    # write to json file
    with open("soundtracks.json", "w") as f:
        json.dump(tracks, f, indent=4)

    return f"Done, added: {len(tracks['tracks'])} track(s)"


if __name__ == "__main__":
    print(main())
