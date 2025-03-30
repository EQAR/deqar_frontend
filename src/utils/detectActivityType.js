export const detectActivityType = (activities) => {
    let activityType = 'institutional';

    if (activities) {
        activities.forEach((activity) => {
            if (activity.activity_type === 'programme' || activity.activity_type === 'institutional/programme') {
                if (activityType === 'institutional') {
                    activityType = activity.activity_type;
                }
            }

            if (activity.activity_type === 'joint programme') {
                activityType = activity.activity_type;
            }
        })
    }

    return activityType
}