import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery
        this.query = query
    }

    search(searchAbleFields: string[]) {
        const search = this?.query?.search
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchAbleFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: search, $options: 'i' },
                        }) as FilterQuery<T>
                ),
            })
        }
        return this
    }

    sort() {
        const sort: any = {}
        if (this.query.sortby && this.query.sortOrder) {
            const sortByFields = (this.query.sortby as string).split(',')
            const sortOrderValues = (this.query.sortOrder as string).split(',')
            sortByFields.forEach((field, index) => {
                sort[field] = sortOrderValues[index]
            })
        }
        this.modelQuery = this.modelQuery.sort(sort as string)
        return this
    }
    filter() {
        const objQuery = { ...this.query }
        const excludeFields = ['search', 'sortby', 'sortOrder', 'filter']
        excludeFields.forEach((el) => delete objQuery[el])
        const fieldToFilter = ['author']
        if (this.query.filter) {
            fieldToFilter.forEach((el) => {
                objQuery[el] = this.query.filter
            })
            delete objQuery.filter
        }
        this.modelQuery = this.modelQuery.find(objQuery as FilterQuery<T>)
        return this
    }
}

export default QueryBuilder
