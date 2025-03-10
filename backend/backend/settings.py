from pathlib import Path
import os

# Define BASE_DIR at the beginning
BASE_DIR = Path(__file__).resolve().parent.parent

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-tw8nb*!6ha4^$l(36r)2!)oukm#%!ogl4t2sto0$2f@@&d=mdh"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'corsheaders',  # Add this
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',

    # Your app
    'tourism',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # CORS Middleware MUST be first
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'tourism/templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'Tourism',
        'USER': 'Tourism_owner',
        'PASSWORD': 'npg_60jHaONMuotz',
        'HOST': 'ep-divine-meadow-a8caqzu0-pooler.eastus2.azure.neon.tech',
        'PORT': '5432',  # Default PostgreSQL port
        'OPTIONS': {
            'sslmode': 'require',  # Ensures secure connection
        },
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# CORS SETTINGS
CORS_ALLOWED_ORIGINS = [
    "https://probable-tribble-wrxrvp4jjwgjf9j57-8000.app.github.dev",
    "https://probable-tribble-wrxrvp4jjwgjf9j57-5173.app.github.dev",
    "http://127.0.0.1:8001",
    "http://127.0.0.1:8000",
]

CORS_ALLOW_CREDENTIALS = True  # If using authentication (cookies or sessions)

CSRF_TRUSTED_ORIGINS = [
    "https://probable-tribble-wrxrvp4jjwgjf9j57-5173.app.github.dev",
    "http://127.0.0.1:8000",
    "https://127.0.0.1:8000",
]

CORS_ALLOW_HEADERS = [
    'content-type',
    'authorization',
    'x-requested-with',
    'Access-Control-Allow-Origin',
    "content-disposition",
    "accept",
]

ALLOWED_HOSTS = ["*"]
