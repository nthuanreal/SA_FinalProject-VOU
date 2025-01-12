package utils

import "fmt"

func NewError(message string) error {
	return fmt.Errorf(message)
}
