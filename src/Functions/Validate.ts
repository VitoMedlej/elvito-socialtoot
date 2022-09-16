const Validate = (val : string) => {
// making sure the errors dont show until the user starts typing

    if (val
        ?.length !== 0 && val.length < 4 || val.length > 30) 
        return true
    return false
}
export default Validate