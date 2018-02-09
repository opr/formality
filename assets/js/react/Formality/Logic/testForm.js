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
                    elements: [
                        {
                            type: 'text',
                            name: 'title'
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
                    elements: [
                        {
                            type: 'text',
                            name: 'card-type'
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
                    elements: [
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