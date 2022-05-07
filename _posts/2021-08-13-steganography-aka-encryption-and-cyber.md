---
title: "Steganography, aka Encryption and Cyber"
date: 2021-08-14T18:16:00+03:00
categories:
  - blog
tags:
  - python
  - steganography
---

Cyber Cyber Cyber
{: .page__subtitle}

During the development of my hackathon, I read a lot about potential technological challenges, that would be also be fun and educational.  


A really cool concept I stumbled upon is called *steganography* 👾

Steganography
---

What is *steganography*?  
I'll just cite a few words from Wikipedia:

> Steganography (/ˌstɛɡəˈnɒɡrəfi/ STEG-ə-NOG-rə-fee) is the practice of concealing a message within another message or a physical object. In computing/electronic contexts, a computer file, message, image, or video is concealed within another file, message, image, or video. The word steganography comes from Greek steganographia, which combines the words steganós (στεγανός), meaning "covered or concealed", and -graphia (γραφή) meaning "writing".  

This sure sound like a really cool technique for hiding information in challenges.  
Just encrypt your data in an otherwise seemingly innocent file, and - Voilà! 🧑‍💻👌 A cyber certified riddle.

The Code
---

For me, coding is a really fun way to actually implement a subject that I'm learning, and so I decided to write down some code that does this process.  
After a few struggles with JPEG compression (like, who knew that a lossy compression algorithm meant that the data changes the data?), 
I came up with a decent method of doing steganography in python, using only 2 dependencies - [cryptography][pip-cryptography] and [imageio][pip-imageio].

It comprises of two classes - Encryptor and Decryptor.  
The Encryptor is initialized with a key and then does the encryption of messages inside images. It is based on a format of header that contains
the length of the message, and then the encrypted message itself.  
It also knows to calculate the loss - percentage of how many bits were changed.  
Of course, this can also be implemented by inserting the encrypted message, with null terminator.  

The Decryptor is initialized with a key and then does the decryption of messages inside images.

Uploading to PyPI
---
I built this package with [poetry][poetry] (which turned out to be a very pleasant way of uploading packages to pypi),  
and after a quick registration process on pypi, it is available on [pypi][pip-pysteg]: just run `pip install pysteg`.  

The source code is available [here][git-pysteg].

[pip-cryptography]: https://pypi.org/project/cryptography/
[pip-imageio]: https://pypi.org/project/imageio/
[poetry]: https://python-poetry.org
[pip-pysteg]: https://pypi.org/project/pysteg/
[git-pysteg]: https://github.com/liorp/pysteg