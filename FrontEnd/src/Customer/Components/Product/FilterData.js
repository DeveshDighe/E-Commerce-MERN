export const color = [
    'White',
    'Black',
    'Red',
    'Marun',
    'Being',
    'Pink',
    'Green',
    'Yellow',
]

export const filters = [
    {
        id: 'color',
        name: 'color',
        options: [
            { value: 'white', label: 'white' },
            { value: 'black', label: 'black' },
            { value: 'blue', label: 'blue' },
            { value: 'brown', label: 'brown' },
            { value: 'green', label: 'green' },
            { value: 'purpul', label: 'purpul' },
            { value: 'yellow', label: 'yellow' },
        ]
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: "S", label: "S" },
            { value: "M", label: "m" },
            { value: "L", label: "L" },
        ]
    }
]


export const singleFilter = [
    {
        id: 'price',
        name: 'Price',
        options: [
            { value: '0', label: 'No Filter' },
            { value: '159-399', label: '₹159 To ₹399' },
            { value: '399-999', label: '₹399 To ₹999' },
            { value: '999-1999', label: '₹999 To ₹1999' },
            { value: '1999-2999', label: '₹1999 To ₹2999' },
            { value: '3999-4999', label: '₹3999 To ₹4999' },
        ]
    },

    {
        id: 'discount',
        name: 'Discount Range',
        options: [
            { value: '0', label: 'No Filter' },
            {
                value: '10',
                label: '10% And Above',
            },
            { value: '20', label: '20% And Above' },
            { value: '30', label: '30% And Above' },
            { value: '40', label: '40% And Above' },
            { value: '50', label: '50% And Above' },
            { value: '60', label: '60% And Above' },
            { value: '70', label: '70% And Above' },
            { value: '80', label: '80% And Above' },
        ]
    },

    // {
    //     id: 'stock',
    //     name: 'Availability',
    //     options: [
    //         {value : 'in_stock', label: 'In Stock'},
    //         {value : 'out_of_stock', label: 'Out Of Stock'},
    //     ]
    // }
]