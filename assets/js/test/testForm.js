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
                            type: 'select',
                            name: 'title'
                        }
                    ]
                }
            ]
        }
    ]
};