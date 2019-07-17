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
    'fieldName': '',
    'fieldType': '',
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
              'fieldName': 'FirstName',
              'fieldType': 'text',
              'title': 'First name',
              'placeholder': 'Enter first name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'MiddleName',
              'fieldName': 'MiddleName',
              'fieldType': 'text',
              'title': 'Middle name',
              'placeholder': 'Enter middle name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'LastName',
              'fieldName': 'LastName',
              'fieldType': 'text',
              'title': 'Middle name',
              'placeholder': 'Enter last name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'Email',
              'fieldName': 'Email',
              'fieldType': 'text',
              'title': 'Email',
              'placeholder': 'Enter email...',
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
              'fieldName': 'FirstName',
              'fieldType': 'text',
              'title': 'First name',
              'placeholder': 'Enter first name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'MiddleName',
              'fieldName': 'MiddleName',
              'fieldType': 'text',
              'title': 'Middle name',
              'placeholder': 'Enter middle name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'LastName',
              'fieldName': 'LastName',
              'fieldType': 'text',
              'title': 'Last name',
              'placeholder': 'Enter last name...',
              'defaultValue': '',
              'options': {}
            }, {
              'id': 'Email',
              'fieldName': 'Email',
              'fieldType': 'text',
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
