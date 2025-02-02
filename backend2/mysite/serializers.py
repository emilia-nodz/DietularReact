from rest_framework import serializers
from mysite.models import *

class AllergenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergen
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    allergens = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Allergen.objects.all(),
        write_only=True
    )
    allergen_details = AllergenSerializer(
        many=True,
        source='allergens',
        read_only=True
    )
    class Meta:
        model = Item
        fields = '__all__'

class MealSerializer(serializers.ModelSerializer):
    items = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Item.objects.all(),
        write_only=True
    )
    item_details = ItemSerializer(
        many=True,
        source='items',
        read_only=True
    )
    class Meta:
        model = Meal
        fields = '__all__'

class DaySerializer(serializers.ModelSerializer):
    items = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Item.objects.all(),
        write_only=True,
        required=False
    )

    item_details = ItemSerializer(
        many=True,
        source='items',
        read_only=True
    )
    meals = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Meal.objects.all(),
        write_only=True,
        required=False
    )

    meal_details = MealSerializer(
        many=True,
        source='meals',
        read_only=True
    )

    class Meta:
        model = Day
        fields = '__all__'

    def update(self, instance, validated_data):
<<<<<<< HEAD
        # Sprawdzamy, czy items i meals są podane, jeśli nie, pozostają niezmienione
=======
        # Sprawdzamy, czy items i meals s� podane, je�li nie, pozostaj� niezmienione
>>>>>>> 86c327b7b46b4489375ea3470314850d8e69d384
        items = validated_data.pop('items', None)
        meals = validated_data.pop('meals', None)

        # Aktualizujemy obiekt Day
        instance.date = validated_data.get('date', instance.date)

        # Aktualizujemy ManyToMany
        if items is not None:
<<<<<<< HEAD
            instance.items.set(items)  # <- Upewniamy się, że items są dodane do dnia
        if meals is not None:
            instance.meals.set(meals)  # <- Upewniamy się, że meals są dodane do dnia
=======
            instance.items.set(items)  # <- Upewniamy si�, �e items s� dodane do dnia
        if meals is not None:
            instance.meals.set(meals)  # <- Upewniamy si�, �e meals s� dodane do dnia
>>>>>>> 86c327b7b46b4489375ea3470314850d8e69d384

        instance.save()
        return instance


