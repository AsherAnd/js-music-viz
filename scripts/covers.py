# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#   Created by: Asher Andargachew                                             #
#                                                                             #
#   Created on: Jan 11, 2022                                                  #
#                                                                             #
#   Description: This is a python script to automatically go through          #
#                the cover directory, get the image name and list             #
#                it inside of a json to then use for the site                 #
#                RUN THIS PROGRAM TO ADD NEW COVERS EASILY                    #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

import json
import os


def main():
    print("File name extraction started...")

    # get path to music
    cwd = os.getcwd()
    direc_name = os.path.dirname(cwd)
    cover_path = os.path.join(direc_name, r"assets\music\image")

    # contain track info in a dictionary
    covers = {"covers": []}

    # go to file directory
    for root, dir, files in os.walk(cover_path):
        # go through each file in the folder
        for index, name in enumerate(files):
            # get info if it is an image file
            if name.endswith(("jpg")):
                covers["covers"].append(
                    {
                        "file name": name,
                    }
                )

    # write to json file
    with open("covers.json", "w") as f:
        json.dump(covers, f, indent=4)

    return "Done"


if __name__ == "__main__":
    print(main())
