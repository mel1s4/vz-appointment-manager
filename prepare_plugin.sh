
rm -rf vz-meetings

# build and rename
# cd availability-rules
# sh build-and-rename.sh
# cd ../calendar-view
# sh build-and-rename.sh
# cd ../calendar-block
# npm run build
# cd ../

# create and copy components files
mkdir vz-meetings
mkdir vz-meetings/availability-rules
cp -r availability-rules/build vz-meetings/availability-rules/build

mkdir vz-meetings/calendar-view
mkdir vz-meetings/calendar-view/build
cp -r calendar-view/build vz-meetings/calendar-view/build

mkdir vz-meetings/calendar-block
mkdir vz-meetings/calendar-block/build
cp -r calendar-block/build vz-meetings/calendar-block/build
cp calendar-block/calendar-block.php vz-meetings/calendar-block/calendar-block.php


# copy all files to the plugin folder except the folders
# find /source/folder -maxdepth 1 -type f -exec cp {} /destination/folder \;
find . -maxdepth 1 -type f -exec cp {} vz-meetings/ \;
cd vz-meetings
rm prepare_plugin.sh
zip -r ../vz-meetings.zip .
cd ../
rm -rf vz-meetings
