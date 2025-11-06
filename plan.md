# Implementation Plan for Co-Authors & Locking (AI Augmented Design & Implementation)

## Summary
Add co-authoring support to articles so multiple users can be listed as co-authors and allowed to edit the same article. Implement an optional locking mechanism to prevent simultaneous edits (advanced). Keep changes minimal, backwards-compatible and aligned with the existing NestJS + MikroORM architecture.

## Plan (step-by-step)
1. **Data model**
   - Add a many-to-many relation `coAuthors` on `Article` referencing `User`.
   - Add `lockedBy` (nullable number) and `lockedAt` (nullable datetime) to the `Article` entity for the advanced lock mechanism.

2. **DTOs**
   - Update `CreateArticleDto` to accept `coAuthors` (array of user identifiers / emails).
   - Add `UpdateArticleDto` to accept `coAuthors` when updating.

3. **Service**
   - On create: resolve co-author identifiers to User entities and attach them to the article.
   - On update: confirm user is author or one of `coAuthors`; enforce lock rules:
     - If another user holds a valid lock (not expired), return a 409 Conflict.
     - If lock expired (>5 minutes), release it and acquire lock for current user.
     - After successful save, release the lock (simulating save/navigation).
   - Implement lock expiration logic (5 minutes since `lockedAt`).
   - Keep code modular and follow existing MikroORM patterns (`entityRepository`, `wrap()`, `flush()`).

4. **Controller**
   - Reuse existing article endpoints; surface `ConflictException` as 409 to the client.
   - Do not change top-level routing or API structure.

5. **Database**
   - Use MikroORM schema update to add the new columns (no destructive drops).
   - Run seeder if needed (only if DB empty).

6. **Acceptance testing**
   - Test 1: Create article as Zolly with John as co-author — confirm `coAuthors` present.
   - Test 2: Login as John and edit — confirm update works.
   - Test 3: While John is editing, try editing as Zolly — confirm either last-save-wins (basic) or 409 conflict (advanced).

7. **Submission**
   - Place 3 screenshots in `submission/` folder (no subfolders):
     1. Article creation with co-author.
     2. Co-author (John) editing success.
     3. Lock/overwrite behavior result (409 or last-save wins).
   - Keep `.aider.chat.history.md` and `.aider.input.history` intact.

## Decisions (top-level)
1. **Keep locking state on Article entity**
   - Alternatives:
     - Keep a separate `Lock` entity table.
     - Use Redis ephemeral locks.
   - Rationale: storing `lockedBy` and `lockedAt` in `Article` is simplest to implement for the assessment, persists state across restarts, and requires no new infrastructure. For production, Redis would be preferable for lower-latency ephemeral locks.

2. **Identify co-authors by email/username in DTOs**
   - Alternatives:
     - Accept user IDs only.
     - Accept full user objects.
   - Rationale: accepting emails/usernames is user-friendly for frontends; server resolves them to IDs. It also makes the basic acceptance test easier (you can paste emails). IDs remain supported internally.

3. **Lock expiry 5 minutes**
   - Alternatives:
     - Use a shorter or longer timeout.
     - Rely on explicit unlock only.
   - Rationale: 5 minutes matches the assessment spec and balances accidental disconnects vs preventing stale locks.

## Notes
- No changes are required to AWS architecture for this assessment.
- For production the lock mechanism should be upgraded to a centralized ephemeral store (Redis) and real-time presence (WebSocket) for better UX.
- Preserve `.aider.*` files (they are required by the grader).
