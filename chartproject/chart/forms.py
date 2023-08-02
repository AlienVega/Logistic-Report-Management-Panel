from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Div, Row, Column
from crispy_forms.bootstrap import AppendedText, PrependedText, FormActions

class MyForm(forms.Form):
    field1 = forms.CharField()
    field2 = forms.EmailField()

    def __init__(self, *args, **kwargs):
        super(MyForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.layout = Layout(
            Row(
                Column('field1', css_class='col-md-6'),
                Column('field2', css_class='col-md-6'),
            ),
            FormActions(
                forms.Submit('submit', 'Gönder'),
                forms.Button('cancel', 'İptal', css_class='btn-secondary'),
            )
        )
