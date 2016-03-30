# Big2 Score #

> Reserve your brain power for the card game instead of doing math

## Summary ##
Drop your pen and paper for tallying scores, after each game, just input the score for each player into the app.
At the end, the app will tell you who owe who and how much.

## Scoring Rules ##
Scoring is one point per card held when the first person gets rid of all their cards, but with 10, 11, and 12 cards the points are doubled, and with 13 cards the points are tripled. Causing someone to get a double or triple is called frying them.
At a time agreed by the players the game ends and the person with the least number of points is the winner.

When playing for money, each player with a worse score than you must pay you the difference between your two scores, and you must pay each player with a better score than you the difference between your two scores.

Example: Scores are `A=81`, `B=40`, `C=107`, `D=63`, so `A` must pay `B` `81-40=41` units, and `D` `81-63=18` units. `B` doesn’t pay anyone since his/her score is the lowest. `C` must pay `A` 107-81=26 units, `B` `107-40=67` units, and `D` `107-63=44` units. `D` must pay `B` `63-40=23` units.

- The final result for `A` is `-41-18+26= -33`.
- The final result for `B` is `+41+67+23 = +131`.
- The final result for `C` is `-26-67-44 = -137`.
- The final result for `D` is `+18+44-23= +39`.

This seems quite complicated when you try to work it out but it actually simplifies to Σsi - 4si where si is the score for player i, in other words: add up all the scores to get Σsi, multiply each score by 4 to get the four 4si’s, then find the differences and multiply by the dollars-per-point. Note that subtracting a constant from all 4 scores doesn’t affect the calculation, so to further simplify, you can subtract the best player’s score from all scores to make the best player’s score zero.

Applying the fast calculation method to the example above gives Σsi = 81 + 40 + 107 + 63 = 291 and 4si = (324, 160, 428, 252)   so   Σsi - 4si = (-33, 131, -137, 39).

http://whitey.net/en/big-two-card-game-rules.htm