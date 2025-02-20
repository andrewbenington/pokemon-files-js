package schema

// SchemaData represents the schema data for PKM code generation
type SchemaData struct {
	FileName              string   `json:"fileName"`
	Fields                []Field  `json:"fields"`
	StringEncoding        string   `json:"stringEncoding"`
	Endian                string   `json:"endian"`
	TotalBytes            int      `json:"totalBytes"`
	TotalBytesExtraFields int      `json:"totalBytesExtraFields"`
	BoxFileSize           int      `json:"boxFileSize"`
	NatureFromPV          bool     `json:"natureFromPV"`
	UnownFromPV           bool     `json:"unownFromPV"`
	GenderFromPV          bool     `json:"genderFromPV"`
	PVAbilityBit          *int     `json:"pvAbilityBit"`
	GenderFromDVs         bool     `json:"genderFromDVs"`
	UnownFromIVs          bool     `json:"unownFromIVs"`
	NoFormes              bool     `json:"noFormes"`
	DetectPrefix          bool     `json:"detectPrefix"`
	ShinyFromDVs          bool     `json:"shinyFromDVs"`
	ShinyThreshold        int      `json:"shinyThreshold"`
	MaxValidMove          int      `json:"maxValidMove"`
	MaxRibbon             string   `json:"maxRibbon"`
	MaxBall               int      `json:"maxBall"`
	AllowedBalls          []int    `json:"allowedBalls"`
	DefaultBall           string   `json:"defaultBall"`
	ChecksumStart         int      `json:"checksumStart"`
	ChecksumEnd           int      `json:"checksumEnd"`
	IsGen3                bool     `json:"isGen3"`
	TrainerIDTracker      bool     `json:"trainerIDTracker"`
	HeightDeviation       *float32 `json:"heightDeviation"`
	WeightDeviation       *float32 `json:"weightDeviation"`
}

func (s *SchemaData) HasField(field string) bool {
	for _, f := range s.Fields {
		if f.Name == field {
			return true
		}
	}
	return false
}
