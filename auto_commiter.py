import os
import subprocess
import requests
from dotenv import load_dotenv
load_dotenv()


# Function to call the OpenAI API and generate a commit message
def generate_commit_message(diff):
    api_key = os.environ.get('OPENAI_API_KEY')
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
    }
    data = {
        'prompt': f'Write a commit message for the following changes:\n\n{diff}\n\n',
        'max_tokens': 60,
        'temperature': 0.5
    }

    response = requests.post('https://api.openai.com/v1/engines/davinci-codex/completions',
                             json=data, headers=headers)
    response.raise_for_status()  # Raise an exception for any failed requests
    return response.json()['choices'][0]['text'].strip()

# Main execution: Get the diff of staged changes
try:
    diff = subprocess.check_output(['git', 'diff', '--cached']).decode('utf-8')
except subprocess.CalledProcessError as e:
    print('Error getting staged changes:', e)
    exit(1)

# Check if there are any staged changes
if not diff.strip():
    print('No staged changes to commit.')
    exit(1)

# Generate the commit message
commit_message = generate_commit_message(diff)
print('Generated commit message:', commit_message)

# Commit the changes with the AI-generated message
try:
    subprocess.check_output(['git', 'commit', '-m', commit_message])
    print('Changes committed successfully.')
except subprocess.CalledProcessError as e:
    print('Error committing changes:', e)