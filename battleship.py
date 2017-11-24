import socket

def print_board(board):
	for i in range(1,6):
		print(i, end='       ')
	print()	
	for row in board:
		print( " ".join(row))

# # if __name__ == "_main_":
# 	# CONNECTION_LIST = []
# 	# RECV_BUFFER = 4096
# 	# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 	# port = 5000
# 	# host = 'localhost'
# 	# s.setsockopt(socket.SOL_SOCKET, socket.SO_RE)
board = []
for i in range(0,5):
	board.append(["|____|"]*5)

print_board(board)