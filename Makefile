VERSION=0.3.8

.PHONY: help
help: # Display this help.
	@awk 'BEGIN {FS = ":.*#"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?#/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^#@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: generate
generate: # Generate PKM code files
	@go run gen/generate.go
	@echo "Formatting TypeScript..."
	@npm run lint
	@npm run format
	@npm run build

.PHONY: lint
lint: # Lint typescript files
	@npm run lint
	@npm run format

.PHONY: set-version
set-version: # Update package version
	@npm version $(VERSION) --no-git-tag-version --allow-same-version
	@npm run build

.PHONY: test
test: # Run jest tests
	@clear && npx jest src/__test__/fields.test.ts --config package.json
