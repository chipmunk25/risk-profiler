const rowClassName = (record, index) => {
    switch (true) {
        case (record.quantity === 0):
            return 'gx-bg-red gx-text-white'
        case (record.quantity === record.reorder_level):
            return 'gx-bg-orange gx-text-white'
        case (record.quantity < record.reorder_level):
            return 'gx-bg-yellow gx-text-geekblue'
        case (record.quantity <= record.reorder_level + 10):
            return 'gx-bg-primary gx-text-white'
        default:
            return 'gx-bg-white gx-text-geekblue';
    }
}

export default rowClassName