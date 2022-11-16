# me-tada-ta
`Me-tada-ta` is a small startup script for InDesign that automagically adds the file name, author's short name and file location of the current document to it's XMP Metadata upon save or export.

## Why that's useful
Exported documents retain this information, and allow you [ or others ] to track down the original author and/or the location of the digital file, even if the original file name is altered.

## Requirements
This script has been lightly tested with the macOS version of Adobe InDesign CC 2018–2022.

## Installation
[Download](https://github.com/mlsteiner/me-tada-ta/releases/) 'me-tada-ta.jsx' and move to the 'startup scripts' directory inside InDesign's 'Scripts' directory. Launch or relaunch InDesign CC for the script to take affect.

## Usage
Once installed, invoking a `save`, `save as…`, or `export` command, either from the File menu or via a key command, will write the 'short name' of the logged in user, the name of the current InDesign document, and its location to the file's XMP metadata.
