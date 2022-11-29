# Publishing to a local registry

To test if your changes will actually work once the changes are published, it can be useful to publish to a local registry.

## Starts the local registry. Keep this running in a separate terminal

yarn local-registry start

## Set npm and yarn to use the local registry

## Note: This reroutes your installs to your local registry

yarn local-registry enable

## Revert npm and yarn to use their default registries

yarn local-registry disable
To publish packages to a local registry, do the following:

Run yarn local-registry start in Terminal 1 (keep it running)
Run npm adduser --registry <http://localhost:4873> in Terminal 2 (real credentials are not required, you just need to be logged in. You can use test/test/test@test.io.)
Run yarn local-registry enable in Terminal 2
Run yarn local-release 999.9.9 in Terminal 2
