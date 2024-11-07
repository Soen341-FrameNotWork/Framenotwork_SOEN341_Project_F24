import datetime
import matplotlib.pyplot as plt

tasks_total = 12
sprint_length = 29

def log_task_completion(completion_dates):
    tasks_remaining = tasks_total
    log = [(datetime.datetime.strptime(completion_dates[0], '%Y-%m-%d').date(), tasks_remaining)]
    
    for idx, completion_date in enumerate(completion_dates[1:]):
        tasks_remaining -= 1
        if tasks_remaining < 0:
            print("All tasks are already completed!")
            return log
        log.append((datetime.datetime.strptime(completion_date, '%Y-%m-%d').date(), tasks_remaining))
    
    return log

def calculate_optimal_path(start_date):
    tasks_remaining = tasks_total
    optimal_log = [(start_date, tasks_remaining)]
    decrement_per_day = tasks_total / sprint_length
    
    for i in range(1, sprint_length + 1):
        tasks_remaining = max(tasks_total - decrement_per_day * i, 0)
        optimal_log.append((start_date + datetime.timedelta(days=i), tasks_remaining))
    
    return optimal_log

def plot_burndown_chart(completion_log, optimal_log):
    dates = [entry[0] for entry in completion_log]
    tasks_remaining = [entry[1] for entry in completion_log]

    # Generate the ideal burndown line
    optimal_dates = [entry[0] for entry in optimal_log]
    optimal_tasks = [entry[1] for entry in optimal_log]

    # Plotting the burndown chart
    plt.figure(figsize=(10, 6))
    plt.plot(dates, tasks_remaining, label="Actual Burndown", marker="o")
    plt.plot(optimal_dates, optimal_tasks, label="Optimal Burndown", linestyle="--", color="orange")
    plt.xlabel("Date")
    plt.ylabel("US Remaining")
    plt.title("Burndown Chart of User Stories Completed")
    plt.legend()
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.grid(True)
    plt.show()

completion_dates = ["2024-10-01", "2024-10-27", "2024-10-29", "2024-10-31", "2024-10-31", "2024-10-31"]
start_date = datetime.datetime.strptime("2024-10-01", '%Y-%m-%d').date()
completion_log = log_task_completion(completion_dates)
optimal_log = calculate_optimal_path(start_date)
plot_burndown_chart(completion_log, optimal_log)

