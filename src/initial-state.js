export const initialState = {
  'mode': 'list',
  'formConfigIndex': -1,
  'showPopup': false,
  'popupWindowTitle': '',
  'popupWindowContent': '',
  'formConfigMatrix': {
    'formName': '',
    'formType': '',
    'fieldSets': []
  },
  'fieldConfigMatrix': {
    'id': '',
    'name': '',
    'type': '',
    'title': '',
    'placeholder': '',
    'defaultValue': '',
    'options': {}
  },
  'formConfigs': [
    {
      'formName': 'Personal info form',
      'formType': 'Personal info',
      'fieldSets': [
        {
          'title': 'Personal info',
          'fields': [
            {
              'id': 'FirstName',
              'name': 'FirstName',
              'type': 'text',
              'title': 'First name',
              'placeholder': 'Enter first name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'MiddleName',
              'name': 'MiddleName',
              'type': 'text',
              'title': 'Middle name',
              'placeholder': 'Enter middle name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'LastName',
              'name': 'LastName',
              'type': 'text',
              'title': 'Middle name',
              'placeholder': 'Enter last name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'Email',
              'name': 'Email',
              'type': 'email',
              'title': 'Email',
              'placeholder': 'Enter email...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'Note',
              'name': 'Note',
              'type': 'textarea',
              'title': 'Note',
              'placeholder': 'Enter note...',
              'defaultValue': '',
              'options': {}
            }
          ]
        }
      ]
    }, {
      'formName': 'Questionnaire form',
      'formType': 'Questionnaire',
      'fieldSets': [
        {
          'title': 'About',
          'fields': [
            {
              'id': 'FirstName',
              'name': 'FirstName',
              'type': 'text',
              'title': 'First name',
              'placeholder': 'Enter first name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'MiddleName',
              'name': 'MiddleName',
              'type': 'text',
              'title': 'Middle name',
              'placeholder': 'Enter middle name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'LastName',
              'name': 'LastName',
              'type': 'text',
              'title': 'Last name',
              'placeholder': 'Enter last name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'Email',
              'name': 'Email',
              'type': 'text',
              'title': 'Email',
              'placeholder': 'Enter email...',
              'defaultValue': '',
              'options': {}
            }
          ]
        }
      ]
    }
  ]
};
