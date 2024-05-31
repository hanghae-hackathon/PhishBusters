#! /usr/bin/env python3
import sys


def get_file_size(file_buffer):
    """get the size of the input file"""
    return len(file_buffer)


def main():
    """Dance with Jazz~~"""
    file_buffer = sys.stdin.buffer.read()
    file_size = get_file_size(file_buffer)
    print(file_size)


if __name__ == "__main__":
    main()
