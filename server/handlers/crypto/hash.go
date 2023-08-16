package crypto

import (
	"crypto/sha256"
	"encoding/hex"
)

func TextToHash(text string) string {
	hasher := sha256.New()
	hasher.Write([]byte(text))
	hashBytes := hasher.Sum(nil)
	return hex.EncodeToString(hashBytes)
}
