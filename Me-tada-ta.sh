#!/usr/bin/env bash

# Name:			Me-tada-ta
# Description:	Automagically adds user and file location information to an InDesign document as an encoded string
# Version:		2.0.2
# URL:			https://github.com/mlsteiner/me-tada-ta
# Author:		Mark Steiner
# Date:			2022.11.16

get-password () {
	password=$(security find-generic-password -s "Me-tada-ta" -w)
	if [ -z "$password" ]
	then
		echo "No Password, please enter one now…"
		read -r password
		add-password
	else
		get-metadata
	fi
}

add-password () {
	security add-generic-password -a "$USER" -s "Me-tada-ta" -w "$password"
	get-password
}

get-metadata () {
	if [ -z "$encodedString" ]
	then 
		printf "\n——\nThis file does not contain any me-tada-ta identifiers\n——\n\n"
	else 
		printf "%s" "$encodedString" | 
		openssl aes-256-cbc -d -a -A -pass pass:"$password" | 
		sed -e 's/^/\n——\n/g; 
		s/File[[:space:]]Name[[:space:]]/File Name:\t/g; 
		s/Created[[:space:]]by[[:space:]]/\nCreated by:\t/g; 
		s/Location[[:space:]]/\nLocation:\t/g; 
		s/$/\n——\n/g'
	fi
}

encodedString=$(mdls -name kMDItemDescription -raw "$1")
get-password