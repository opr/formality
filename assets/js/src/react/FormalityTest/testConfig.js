export const testConfig = {
  //this is a config area for various settings, the actual form config will appear further down

  //callback URL - when the form is submitted, this is the URL that the form is submitted to
  callbackUrl: '/my-api',

  //callback method - which verb to use when submitting the form
  callbackMethod: 'POST',

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
              name: 'Address one',
              type: 'text'
            },
            {
              name: 'Address two',
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
