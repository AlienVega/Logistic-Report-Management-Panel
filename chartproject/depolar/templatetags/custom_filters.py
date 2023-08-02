from django import template

register = template.Library()

@register.filter
def get_attribute(obj, attr):
    return getattr(obj, attr)

@register.filter
def filter_data(data, depo_id, tarih):
    return data.filter(ware_house_id=depo_id, tarih__year=tarih)
