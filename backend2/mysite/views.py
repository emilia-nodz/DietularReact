import logging
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)

class AllergenViewSet(viewsets.ModelViewSet):
    serializer_class = AllergenSerializer
    queryset = Allergen.objects.all()

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class DayViewSet(viewsets.ModelViewSet):
    serializer_class = DaySerializer
    queryset = Day.objects.all()

    def update(self, request, *args, **kwargs):
        logger.debug(f"Request data: {request.data}")  # Logujemy co dostaje backend
        response = super().update(request, *args, **kwargs)
        logger.debug(f"Response data: {response.data}")  # Logujemy co zwraca backend
        return response
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Day.DoesNotExist:
            return Response({"message": "Day not found"}, status=status.HTTP_200_OK)

class MealViewSet(viewsets.ModelViewSet):
    serializer_class = MealSerializer
    queryset = Meal.objects.all()

