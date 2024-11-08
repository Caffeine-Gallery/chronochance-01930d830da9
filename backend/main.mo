import Bool "mo:base/Bool";
import Text "mo:base/Text";
import Timer "mo:base/Timer";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Random "mo:base/Random";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor {
    // Store quotes as stable variable to persist across upgrades
    stable var quotes : [Text] = [
        "The only way to do great work is to love what you do.",
        "Success is not final, failure is not fatal.",
        "Focus on being productive instead of busy.",
        "Time is what we want most, but what we use worst.",
        "Action is the foundational key to all success.",
        "Don't count the days, make the days count."
    ];

    stable var sessionCount : Nat = 0;
    stable var currentTimerStart : ?Int = null;

    // Get a random quote
    public func getRandomQuote() : async Text {
        let seed = await Random.blob();
        let randomNum = Int.abs(Time.now()) % quotes.size();
        quotes[randomNum]
    };

    // Start a new timer session
    public func startTimer() : async Int {
        let currentTime = Time.now();
        currentTimerStart := ?currentTime;
        currentTime
    };

    // End current timer session
    public func endTimer() : async Bool {
        switch (currentTimerStart) {
            case (?startTime) {
                let currentTime = Time.now();
                let duration = currentTime - startTime;
                // Check if at least 25 minutes (1500000000000 nanoseconds) have passed
                if (duration >= 1500000000000) {
                    sessionCount += 1;
                    currentTimerStart := null;
                    return true;
                };
                return false;
            };
            case (null) {
                return false;
            };
        }
    };

    // Get current session count
    public query func getSessionCount() : async Nat {
        sessionCount
    };

    // Check timer status
    public query func getTimerStatus() : async ?Int {
        currentTimerStart
    };
}
