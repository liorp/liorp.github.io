---
title: "Steganography, aka Encryption and Cyber"
date: 2021-08-14T18:16:00+03:00
categories:
  - development
tags:
  - python
  - steganography
excerpt: "Cyber Cyber Cyber"
---

During the development of my hackathon, I read a lot about potential technological challenges that would also be fun and educational.

A really cool concept I stumbled upon is called _steganography_ 👾

## Steganography

What is _steganography_?
I'll just cite a few words from Wikipedia:

> Steganography (/ˌstɛɡəˈnɒɡrəfi/ STEG-ə-NOG-rə-fee) is the practice of concealing a message within another message or a physical object. In computing/electronic contexts, a computer file, message, image, or video is concealed within another file, message, image, or video. The word steganography comes from Greek steganographia, which combines the words steganós (στεγανός), meaning "covered or concealed", and -graphia (γραφή) meaning "writing".  

This sure sounds like a really cool technique for hiding information in challenges.
Just encrypt your data in an otherwise innocent file, and voilà! 👨‍💻👌 A cyber certified riddle.

## The Code

For me, coding is a really fun way to actually implement a subject that I'm learning, so I decided to write down some code that does this process.

After a few struggles with JPEG compression (like, who knew that a lossy compression algorithm meant that the data changes the data?), I came up with a decent method of doing steganography in Python, using only 2 dependencies - [cryptography][pip-cryptography] and [imageio][pip-imageio].

It consists of two classes:

- **Encryptor**: Initialized with a key, it encrypts messages inside images. It is based on a header format that contains the length of the message, and then the encrypted message itself. It also knows to calculate the loss—the percentage of how many bits were changed. (Of course, you could also implement this by inserting the encrypted message with a null terminator.)
- **Decryptor**: Initialized with a key, it decrypts messages inside images.

## Uploading to PyPI

I built this package with [poetry][poetry], which turned out to be a very pleasant way to upload packages to PyPI. After a quick registration process on PyPI, it is available on [PyPI][pip-pysteg]: just run `pip install pysteg`.

The source code is available [here][git-pysteg].

[pip-cryptography]: https://pypi.org/project/cryptography/
[pip-imageio]: https://pypi.org/project/imageio/
[poetry]: https://python-poetry.org
[pip-pysteg]: https://pypi.org/project/pysteg/
[git-pysteg]: https://github.com/liorp/pysteg
