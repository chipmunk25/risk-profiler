
import { SearchForAddress } from "appRedux/api/bookings"
function* SearchAddress(postcode) {
    const results = yield SearchForAddress(postcode)
    // console.log(results)
    return yield results
}

export default SearchAddress;