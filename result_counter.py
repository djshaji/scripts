#!/usr/bin/env python3

import sys, argparse

PASS_MARKS = 29
# PASS_MARKS = 14
ABSENT = 'AB'
NA = 'NA'

def count (stub, filename):
    f = open (filename)
    data = f.read ()

    # Because people are sometimes incompetent
    data = data.replace ("[", '(')
    data = data.replace ("]", ')')
    
    data = data.replace (" ", "")
    
    ms = data.split (stub + "(")
    marks = []
 
 
    for m in ms:
        if (m [:2] == ABSENT):
            marks.append (-1)
        elif (m [:2] == NA):
            marks.append (-2)
        else:
            try:
                marks.append (int (m [0] + m [1]))
            except ValueError as v:
                if (m[1] != ','):
                    print (v, ' in ', m [:10], '...')
                    continue
                try:
                    marks.append (int (m [0]))
                except ValueError as ve:
                    print (ve, ' in ', m [:10], '...')

    return marks
    # for m in marks:
        # print (m)
    
    # print (len (marks))


def calculate_result (marks):
    passed = reapp = absent = na = 0
    
    for m in marks:
        if (m >= PASS_MARKS):
            # print ('pass ', m)
            passed += 1
        elif (m == -1):
            absent += 1
        elif (m == -2):
            na += 1
        else:
            # print ('reappear ', m)
            reapp += 1
    
    return passed, reapp, absent, na

def print_result (marks):
    passed, reapp, absent, na = calculate_result (marks)
    print (
        'total: ', len (marks),
        ' passed: ', passed,
        ' reappear: ', reapp,
        ' absent: ', absent,
        ' na: ', na)
    print (
        'Pass % :', round ((passed / (passed + reapp)) * 100, 1))

        

if __name__ == "__main__":
    print ("usage:", sys.argv [0], "filename subject_code min marks");
    if (len (sys.argv) == 4):
        PASS_MARKS = int (sys.argv [3])
    
    # marks = count (sys.argv [1], sys.argv [2])
    marks = count (sys.argv [2], sys.argv [1])
    print_result (marks)
