export const testConfig = {

  //this is a config area for various settings, the actual form config will appear further down
  options: {

    //callback URL - when the form is submitted, this is the URL that the form is submitted to
    callbackUrl: '/my-api',

    //callback method - which verb to use when submitting the form
    callbackMethod: 'POST'
  },

  //here we begin to define the form itself

  //an array of objects, of length one or greater. One object = one page.
  pages: [

    //page 1
    {
      name: 'Personal details',
      //you can give an array of extra classes to add to this page
      classes: ['extra-class-on-section'],

      //the page can have any nonzero, positive number of sections, which, like pages, is an array of objects
      sections: [

        {
          //each section has an optional name
          name: 'Address',
          classes: ['extra-class-on-section'],

          //the fields in the section, an array of objects
          fields: [
            {
              name: 'Voucher code',
              type: 'checkbox',
              value: 'voucher-applied'
            },
            {
              name: 'Address one',
              type: 'text',
              //validation will be a map with some options/conditions, you can also pass a function that will receive
              // an immutable list of fields and next field value
              validation: {
                length: 5,
                regex: /[a-zA-Z0-9]*/,
                compareTo: 'Address two',
                compareOperator: '!=',
                invalidMessage: 'Too short, or cant be the same as address 2!'
              }
            },
            {
              name: 'Address two',
              type: 'text',
              //you can give an array of classes to add to this field
              classes: ['extra-class-one'],
              validation: [
                {
                  length: 2,
                  invalidMessage: 'Too short'
                }
              ]
            },
            {
              name: 'Email',
              type: 'text',
              validation: [
                {
                  compareTo: 'Confirm email',
                  compareOperator: '==',
                  invalidMessage: 'Emails must match',
                  compareOnlyIfDirty: true
                },
                {
                  required: true,
                  invalidMessage: 'Email is required'
                }
              ],
            },
            {
              name: 'Confirm email',
              type: 'text',
              validation: [
                {
                  compareTo: 'Email',
                  compareOperator: '==',
                  invalidMessage: 'Emails must match',
                  compareOnlyIfDirty: true
                },
                {
                  required: true,
                  invalidMessage: 'Confirm email is required'
                }
              ]
            }
          ]
        },

        {
          name: 'Professional details',
          fields: [
            {
              name: 'Job title',
              type: 'text'
            }
          ]
        }
      ]
    },
    {
      name: 'Company details',
      //you can give an array of extra classes to add to this page
      classes: ['extra-class-on-section'],

      //the page can have any nonzero, positive number of sections, which, like pages, is an array of objects
      sections: [

        {
          //each section has an optional name
          name: 'Company address',
          classes: ['extra-class-on-section'],

          //the fields in the section, an array of objects
          fields: [
            {
              name: 'Company address one',
              type: 'text'
            },
            {
              name: 'Company address two',
              type: 'text',
              //you can give an array of classes to add to this field
              classes: ['extra-class-one']
            }
          ]
        }
      ]
    }
  ]
};
