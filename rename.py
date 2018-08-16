import os, glob

a = glob.glob ("*")
for i in a:
    os.rename (i, i.replace ("|", "_"))

a = glob.glob ("*")
for i in a:
    os.rename (i, i.replace ("\"", "_"))

a = glob.glob ("*")
for i in a:
    os.rename (i, i.replace (":", "_"))
