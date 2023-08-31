package params

import (
	"net/http"
)

func CheckParam(w http.ResponseWriter, r *http.Request, parameter string) bool {
	queryParams := r.URL.Query()

	if !queryParams.Has(parameter) {
		http.Error(w, "Parameter not found. Looking for `"+parameter+"` in the URL requested.", 404)
		return false
	}

	return true
}

func GetParam(parameter string, r *http.Request) string {
	queryParams := r.URL.Query()

	return queryParams.Get(parameter)
}
