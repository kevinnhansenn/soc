// Status for instructor
export enum STATUS_INSTRUCTOR {
    NOTLOGGEDIN,
    WAITING, // Waiting student to join
    PRE, // Before publishing the question
    POST // After publishing the question
}

export enum STATUS_STUDENT {
    NOTLOGGEDIN,
    WAITING,
    READY,
    ANSWERED
}
