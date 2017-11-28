import socket

def print_board(board):
	print(' ', end='')
	for i in range(1,6):
<<<<<<< HEAD
		print(i,'       ')
	print()
	for row in board:
		print( "".join(row))
=======
		print('    ' + str(i), end=' ')

	print("\n", end='   ')
	for i in range(1,6):
		print("______", end='')	
	print("\n", end='')

	count = 0
	for row in board:
		count += 1
		print("  " + "|     "*5 + '|')

		print(count, end='')
		
		print(" " +"|     "*5 + '|')
		print("  " + "".join(row) + '|')
>>>>>>> e8c12d0bfaff51183180a7e9006b604a45018420

# # if __name__ == "_main_":
# 	# CONNECTION_LIST = []
# 	# RECV_BUFFER = 4096
# 	# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 	# port = 5000
# 	# host = 'localhost'
# 	# s.setsockopt(socket.SOL_SOCKET, socket.SO_RE)
board = []
for i in range(0,5):
<<<<<<< HEAD
	board.append(["|____"]*5)
=======
	board.append(["|_____"]*5)
>>>>>>> e8c12d0bfaff51183180a7e9006b604a45018420

print_board(board)
