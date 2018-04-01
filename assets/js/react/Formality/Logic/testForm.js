export const testForm = {
  formName: 'testForm',
  formEndpoint: '/testEndpoint',
  formMethod: 'post',
  formAction: '/testAction',
  pages: [
    {
      allowInvalidProgression: false,
      name: 'Basic Info',
      sections: [
        {

          name: 'Personal Details',
          fields: [
            {
              type: 'select',
              name: 'title',
              label: 'Title',
              options: {
                mr: 'Mr.',
                mrs: 'Mrs.',
                miss: 'Miss',
                sir: 'Sir'
              },
              defaultValue: 'Please select…',
              validation: {
                required: true
              }
            },
            {
              type: 'text',
              label: 'Maiden name (if applicable)',
              name: 'maiden-name',
              displayRules: {
                hideByDefault: true,
                ruleSets: [
                  {
                    conditions: [{
                      variable: 'title',
                      value: 'mrs',
                      compare: '='
                    }],
                    action: 'show'
                  }
                ]
              }
            },
            {
              type: 'email',
              label: 'Your email address',
              name: 'email-address',
              validation: {
                required: true,
                type: 'email'
              }
            },
            {
              type: 'password',
              label: 'Password',
              name: 'password',
              validation: [
                {
                  minLength: 8,
                  regex: /(?=.*[A-Z])/,
                  validationMessage: 'Please make sure the password is at least 8 characters long and contains a capital letter'
                },
                {
                  maxLength: 12,
                  validationMessage: 'Don\'t make your passwords too long'
                }
              ]
            },
            {
              type: 'password',
              label: 'Repeat password',
              name: 'repeat-password',
              validation: [
                {
                  minLength: 8,
                  regex: /(?=.*[A-Z])/,
                  validationMessage: 'Please make sure the password is at least 8 characters long and contains a capital letter'
                },
                {
                  maxLength: 12,
                  validationMessage: 'Don\'t make your passwords too long'
                },
                {
                  equalTo: 'password',
                  validationMessage: 'Passwords must match'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'Payment Details',
      sections: [
        {
          name: 'Credit Card',
          fields: [
            {
              type: 'text',
              name: 'card-type'
            }
          ]
        },
        {
          name: 'Bank Account',
          fields: [
            {
              type: 'text',
              name: 'bank-name'
            }
          ]
        }
      ]
    },
    {
      name: 'Education Details',
      sections: [
        {
          name: 'School',
          fields: [
            {
              type: 'text',
              name: 'school-name'
            }
          ]
        },
        {
          name: 'University',
          fields: [
            {
              type: 'text',
              name: 'university-name'
            }
          ]
        }
      ]
    },
    {
      name: 'Contact Details',
      sections: [
        {
          name: 'Home Address',
          fields: [
            {
              type: 'text',
              name: 'house-number'
            }
          ]
        }
      ]
    }

  ]
};
