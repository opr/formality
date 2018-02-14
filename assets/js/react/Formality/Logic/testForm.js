export const testForm = {
    formName: 'testForm',
    formEndpoint: '/testEndpoint',
    formMethod: 'post',
    formAction: '/testAction',
    pages: [
        {
            name: 'Basic Info',
            sections: [
                {
                    name: 'Personal Details',
                    fields: [
                        {
                            type: 'text',
                            name: 'title',
                            label: 'Title',
                            validation: {
                                required: true,
                                minLength: 2,
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
            name: 'Contat Details',
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