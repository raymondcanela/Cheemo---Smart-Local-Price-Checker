from decimal import Decimal, InvalidOperation

def clean_price(price):
    if price is None:
        return None

    if isinstance(price, str):
        price = price.replace("$", "").replace(",", "").strip()

    try:
        return Decimal(str(price))
    except InvalidOperation:
        return None


def extract_image_url(images):
    if not images or not isinstance(images, list):
        return None

    first = images[0]

    if not isinstance(first, dict):
        return None

    return first.get("hi_res") or first.get("large") or first.get("thumb")


def clean_description(description):
    if description is None:
        return None

    if isinstance(description, list):
        return " ".join(description)

    return str(description)


def transform_product(raw):
    return {
        "title": raw.get("title"),
        "main_category": raw.get("main_category"),
        "description": clean_description(raw.get("description")),
        "average_rating": raw.get("average_rating"),
        "price": clean_price(raw.get("price")),
        "image_url": extract_image_url(raw.get("images")),
        "store_name": raw.get("store") or "Unknown Store"
    }


def is_valid_product(product):
    return product["title"] is not None and product["price"] is not None