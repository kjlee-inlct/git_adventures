# References and Product Research

Git Adventures is independently designed for Git learning. The following projects and discussions are used as product and learning-design references, not as source code or lesson content to copy.

## VIM Adventures

https://vim-adventures.com/

Useful product ideas:

- learning through interaction rather than documentation alone
- progressive discovery of commands
- game context that makes repetitive practice memorable

Product caution applied to Git Adventures:

- Free Core should provide a meaningful complete learning outcome before monetization pressure
- paywall placement must not interrupt the first successful learning loop

## VIM Master

https://github.com/renzorlive/vimmaster

Useful architecture and product ideas:

- browser-based interactive simulation
- progressive lessons
- XP / achievements / practice concepts
- local progress
- content-driven architecture where lessons are data
- contract / golden / regression testing for content stability
- strong separation between learning content and engine code

Git Adventures differs in domain model: Git learning is centered on Repository State, History, Branches, and safe workflow decisions instead of keypress muscle memory.

## Hacker News discussion

https://news.ycombinator.com/item?id=45041315

Recurring feedback considered:

- users value game-like learning when it is immediately usable
- mandatory login before evaluation creates friction
- early paywalls can create negative reactions even when payment itself is acceptable
- intermediate and advanced users want substantial content beyond beginner basics
- users repeatedly ask for more levels and harder practice
- correctness of the simulator matters: input behavior bugs quickly break trust
- some learners want feedback about when a more efficient technique exists, not only whether a solution works

Git Adventures product responses:

- Guest-first onboarding
- local progress for Free users
- complete Foundations experience without mandatory login
- advanced Recovery / Collaboration / Incident tracks planned from the beginning
- state-based validation to accept multiple safe solutions where possible
- optional efficiency scoring only after correctness and safety
- content schema and golden scenario tests planned before large-scale content growth

## Git writing and workflow references

The companion Git Guide project also draws from:

- https://cbea.ms/git-commit/
- https://blog.appkr.dev/learn-n-think/comparing-workflows/

Git Adventures uses the same principles for atomic commits, meaningful history, Feature Branch workflow, and safe shared-history practices.

## Independence

Reference projects may have their own licenses, trademarks, visual identities, and content. Git Adventures should not copy proprietary level text, artwork, branding, or implementation. Use references to understand successful learning patterns and user expectations, then implement original Git-focused scenarios and architecture.
