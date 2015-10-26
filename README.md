# thomaskolasa.github.io

Tic-tac-toe:

I determined how to solve Tic-Tac-Toe for an N-sized board. By numbering each cell on the board 0 to N^2-1, I was able to find a pattern using modulo arithmetic. The winning cases to check for were winning by row, column, and the two diagnols.

0 1 2
3 4 5
6 7 8

0  1  2  3
4  5  6  7
8  9  10 11
12 13 14 15

Looking at these sample boards, 