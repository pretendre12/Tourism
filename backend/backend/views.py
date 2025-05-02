from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
<<<<<<< HEAD
from django.contrib.auth import get_user_model, login
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()
=======
>>>>>>> 1b419335 (Pending changes exported from your codespace)

def api_home(request):
    return JsonResponse({"message": "Welcome to the API"})

@api_view(["POST"])
def signup(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({"message": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"message": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST)

    # Create new user
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"message": "Signup successful!"}, status=status.HTTP_201_CREATED)

<<<<<<< HEAD
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username
            }
        }, status=status.HTTP_200_OK)
        
    return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
=======
@api_view(["POST"])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, email=email, password=password)
    
    if user:
        return Response({"message": "Login successful", "user": user.username})
    return Response({"error": "Invalid credentials"}, status=400)
>>>>>>> 1b419335 (Pending changes exported from your codespace)
