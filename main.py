import pygame
import sys

pygame.init()

SCALE = 10
WIDTH = 800
HEIGHT = 500

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Canvas Point Drawer")

def interpolate(a_min, a_max, b_min, b_max, a):
    if a_max - a_min == 0:
        return b_min
    
    t = (a - a_min) / (a_max - a_min)
    return round(((1 - t) * b_min) + (t * b_max))

def draw_pixel(point, color=(0, 0, 0)):
    x, y = point
    rect = pygame.Rect(x * SCALE, y * SCALE, SCALE, SCALE)
    pygame.draw.rect(screen, color, rect)

def draw_line(point1, point2, color):
    if point1[0] > point2[0]:
        point1, point2 = point2, point1
    
    diff_x = abs(point1[0] - point2[0])
    diff_y = abs(point1[1] - point2[1])
    
    if diff_x > diff_y:
        for x in range(point1[0], point2[0]):
            y = interpolate(point1[0], point2[0], point1[1], point2[1], x)
            draw_pixel([x, y], color)
    else:
        for y in range(point1[1], point2[1]):
            x = interpolate(point1[1], point2[1], point1[0], point2[0], y)
            draw_pixel([x, y], color)

screen.fill((255, 255, 255))

draw_line([15, 5], [0, 0], (255, 0, 0))
draw_line([10, 15], [0, 0], (0, 255, 0))
draw_line([3, 0], [13, 15], (0, 0, 255))

pygame.display.flip()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

pygame.quit()
sys.exit()