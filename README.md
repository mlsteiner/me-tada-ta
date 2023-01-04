# Me-tada-ta 2.0
`Me-tada-ta` helps Designers and Design teams identify authors and file locations of their Me-tada-ta tagged PDF documents.

Me-tada-ta consists of two parts:
`Me-tada-ta.sh` scans the PDF document and decodes the encrypted string generated and embedded by `me-tada-ta_helper.jsx`
`me-tada-ta_helper.jsx` is an InDesign startup script that automagically adds the file name, author's short name and file location of the current InDesign document as an encoded [ aes 256 ] string to the file's XMP Metadata upon save, save as, or export.

## Why that's useful
Exported PDF documents retain this information, and allow you [ or others ] to track down the original author and/or the location of the digital file, even if the original file name is altered.

## Requirements
This script has been tested with the macOS [ 12.x - 13.x ] version of Adobe InDesign CC 2018–2022 [ 17.2 ].

## Installation
[Download](https://github.com/mlsteiner/me-tada-ta/releases/) 'Me-tada-ta.sh' and move it to usr/local/bin.
[Download](https://github.com/mlsteiner/me-tada-ta/releases/) 'me-tada-ta_helper.jsx' and move it to the 'startup scripts' directory inside InDesign's 'Scripts' directory. Launch or relaunch InDesign CC for the script to take affect.

## Usage
Once installed, invoking a `save`, `save as…`, or `export` command, either from the File menu or via a key command, will write the 'short name' of the logged in user, the name of the current InDesign document, and its location as an encoded string to the file's XMP metadata.
