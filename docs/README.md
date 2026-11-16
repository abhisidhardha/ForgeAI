# Developer documentation

ForgeAI currently ships a single-user-per-account project and task management
workflow. Backend V1 and Frontend V1 are implemented. AI Integration V1 is next.

## Start here

Read these in order when joining the project:

1. [Project overview](../README.md): current scope and repository structure.
2. [Local setup](getting-started.md): dependencies, database, environment, and startup.
3. [Architecture](architecture.md): request flow, data model, and authorization.
4. [Feature guide](features.md): where each feature lives and how to change it.
5. [Build progression](build-progression.md): the logical sequence of V1 development.
6. [API reference](api.md): routes, payloads, and current error behavior.
7. [Contributing](../CONTRIBUTING.md): branches, commits, reviews, and comments.
8. [Roadmap](roadmap.md): AI Integration V1 and acceptance criteria.
9. [Verification and known gaps](verification.md): checks, manual scenarios, and limits.

## Maintaining these documents

- Update the API reference with every route or response change.
- Update feature status only when its implementation and verification exist.
- Keep planned work in the roadmap; keep shipped work in [CHANGELOG](../CHANGELOG.md).
- Record significant design decisions in [architecture](architecture.md).
- Keep environment examples aligned with configuration reads in the source.
- Treat [layout_blueprint.md](../layout_blueprint.md) as an earlier design proposal.
  It is not a statement that the proposed CSS Grid refactor has shipped.

Documentation describes the checked-in source. It does not establish production
readiness or replace verification against a running environment.
